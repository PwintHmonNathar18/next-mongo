"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
  const [error, setError] = useState("");

  // ✅ centralize fetching so we can reuse after POST/DELETE
  async function fetchCustomers() {
    const res = await fetch("/api/customers", { cache: "no-store" });
    const data = await res.json();
    setCustomers(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function addCustomer(e) {
    e.preventDefault();
    setError(""); // Reset error
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Failed to create customer");
      return;
    }
    await fetchCustomers();
    setForm({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
  }

  async function deleteCustomer(id) {
    if (!confirm("Delete this customer?")) return;
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    // ✅ refetch to avoid stale list/state mismatches
    await fetchCustomers();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Form */}
      <form onSubmit={addCustomer} className="grid grid-cols-4 gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={e=>setForm({...form, name:e.target.value})}
          className="border p-2 rounded"
        />
        <input
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={e=>setForm({...form, dateOfBirth:e.target.value})}
          className="border p-2 rounded"
        />
        <input
          name="memberNumber"
          placeholder="Member Number"
          value={form.memberNumber}
          onChange={e=>setForm({...form, memberNumber:e.target.value})}
          className="border p-2 rounded"
        />
        <input
          name="interests"
          placeholder="Interests"
          value={form.interests}
          onChange={e=>setForm({...form, interests:e.target.value})}
          className="border p-2 rounded"
        />
        <div className="col-span-4 text-right">
          <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </div>
        {error && <div className="col-span-4 text-red-600">{error}</div>}
      </form>

      {/* Table */}
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Member #</th>
            <th className="p-2 border">Interests</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td className="p-2 border">
                <Link href={`/customers/${c._id}`} className="text-blue-600 hover:underline">
                  {c.name}
                </Link>
              </td>
              <td className="p-2 border">{c.dateOfBirth ? new Date(c.dateOfBirth).toLocaleDateString() : ""}</td>
              <td className="p-2 border">{c.memberNumber}</td>
              <td className="p-2 border">{Array.isArray(c.interests) ? c.interests.join(", ") : c.interests}</td>
              <td className="p-2 border">
                <button onClick={() => deleteCustomer(c._id)} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">No customers yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
