// app/page.js
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function BoxBasic() {
  return (
    <main>
      <Box component="section" className="border border-gray-800 m-5 text-center p-6 rounded-lg">
        <h1 className="text-3xl text-violet-950 mb-4">Stock Management Final</h1>

        <div className="flex gap-3 justify-center">
          <Button component={Link} href="/product" variant="contained">
            Products
          </Button>
          <Button component={Link} href="/category" variant="contained" color="secondary">
            Category
          </Button>
          <Button component={Link} href="/customers" variant="outlined">
            Customers
          </Button>
        </div>

        {/* (Optional) keep the old list for fallback navigation)
        <ul className="mt-4">
          <li><a href="/product">Products</a></li>
          <li><a href="/category">Category</a></li>
          <li><a href="/customers">Customers</a></li>
        </ul>
        */}
      </Box>
    </main>
  );
}
