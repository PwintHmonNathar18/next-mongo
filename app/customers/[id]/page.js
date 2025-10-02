"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => setCustomer(data));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h1>{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
