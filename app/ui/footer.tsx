export function Footer() {
  return (
    <footer className="w-full bg-green-100 text-green-900 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="flex flex-col">
        <h2 className="font-bold">Shop</h2>
        <p>New Arrivals</p>
        <p>Best Sellers</p>
        <p>Sale</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold">About Us</h2>
        <p>Our Story</p>
        <p>Careers</p>
        <p>Email: support@gabifixes.com</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold">Legal</h2>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
    </footer>
  );
}
