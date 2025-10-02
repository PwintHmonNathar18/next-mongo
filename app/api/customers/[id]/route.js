import connect from "@/lib/db";
import Customer from "@/models/Customer";
import { API_BASE } from '@/lib/config';


// GET one customer
export async function GET(req, { params }) {
  await connect();
  const customer = await Customer.findById(params.id);
  return Response.json(customer);
}

// UPDATE customer
export async function PUT(req, { params }) {
  await connect();
  const body = await req.json();
  const updated = await Customer.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

// DELETE customer
export async function DELETE(req, { params }) {
  await connect();
  await Customer.findByIdAndDelete(params.id);
  return Response.json({ message: "Customer deleted" });
}
