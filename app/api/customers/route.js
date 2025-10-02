import connect from "@/lib/db";
import Customer from "@/models/Customer";

// ✅ Ensure this route is never statically cached
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/customers  → list all customers
export async function GET() {
  try {
    await connect();
    const customers = await Customer.find().lean();
    return Response.json(customers, { status: 200 });
  } catch (err) {
    console.error("GET /api/customers error:", err);
    return Response.json({ error: "Failed to load customers" }, { status: 500 });
  }
}

// POST /api/customers  → create a new customer
export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    // Ensure interests is always an array of strings
    let interests = body.interests;
    if (typeof interests === "string") {
      interests = interests.split(",").map(s => s.trim()).filter(Boolean);
    } else if (!Array.isArray(interests)) {
      interests = [];
    }

    const doc = {
      ...body,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      interests,
    };

    const customer = new Customer(doc);
    await customer.save();
    return Response.json(customer, { status: 201 });
  } catch (err) {
    console.error("POST /api/customers error:", err);
    return Response.json(
      { error: "Failed to create customer", details: err?.message },
      { status: 400 }
    );
  }
}
