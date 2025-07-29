import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { PRODUCT_PRICES, BASE_PRICE } from "@/config/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { configId, userId, userEmail, color, finish, material, model } =
      body;

    console.log("🔍 Checkout API called with:", {
      configId,
      userId,
      userEmail,
    });

    // Skip server-side auth check, use passed user data
    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: "User information required" },
        { status: 400 }
      );
    }

    // Get configuration from database
    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    });

    if (!configuration) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    // Calculate total price
    let price = BASE_PRICE;
    if (finish === "textured") {
      price += PRODUCT_PRICES.finish.textured;
    }
    if (material === "polycarbonate") {
      price += PRODUCT_PRICES.material.polycarbonate;
    }

    // Get or create user in database
    const user = await db.user.upsert({
      where: { id: userId },
      update: {
        email: userEmail,
      },
      create: {
        id: userId,
        email: userEmail,
      },
    });

    // Create order
    const order = await db.order.create({
      data: {
        configurationId: configId,
        userId: user.id,
        amount: price,
        isPaid: false,
        status: "awaiting_shipment",
      },
    });

    // Create complete Stripe session
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configId}`,
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["DE", "US", "CA", "GB"],
      },
      metadata: {
        userId: user.id,
        orderId: order.id,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Custom iPhone Case",
              images: [configuration.imageUrl],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
