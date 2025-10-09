export function Profile() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <h2 className="font-bold text-2xl ">Edit profile</h2>
      <div className="flex flex-col gap-2 item-start">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <label htmlFor="Name" className="text-gray ">
          Full Name
        </label>
        <input
          type="text"
          className="w-full p-4 rounded-2xl border border-green-500 focus:outline-2 focus:outline-green-500"
        />
        <label htmlFor="Email" className="text-gray ">
          Email
        </label>
        <input
          type="email"
          className="w-full p-4 rounded-2xl border border-green-500  focus:outline-2 focus:outline-green-500"
        />
        <label htmlFor="Password" className="text-gray ">
          Password
        </label>
        <input
          type="password"
          className="w-full p-4 rounded-2xl border border-green-500  focus:outline-2 focus:outline-green-500"
        />
      </div>
      <div className="flex flex-col gap-2 item-start">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <label htmlFor="Address" className="text-gray">
          Address
        </label>
        <input
          type="text"
          className="w-full p-4 rounded-2xl border border-green-500 focus:outline-2 focus:outline-green-500"
        />
        <label htmlFor="City" className="text-gray">
          City
        </label>
        <input
          type="text"
          className="w-full p-4 rounded-2xl border border-green-500 focus:outline-2 focus:outline-green-500"
        />
        <label htmlFor="State" className="text-gray">
          State
        </label>
        <input
          type="text"
          className="w-full p-4 rounded-2xl border border-green-500 focus:outline-2 focus:outline-green-500"
        />
        <label htmlFor="zipcode" className="text-gray">
          Zip Code
        </label>
        <input
          type="text"
          className="w-full p-4 rounded-2xl border border-green-500 focus:outline-2 focus:outline-green-500"
        />
      </div>
      <div className="flex flex-col gap-4 item-start">
        <h3 className="text-2xl font-semibold">Payment Methods</h3>
        <div className="flex justify-between p-4 border border-green-500 rounded-2xl">
          <div className="flex gap-2">
            <div className="bg-gray-500 h-10 w-10 rounded" />
            <div className="">
              <p>Visa</p>
              <p>Expires 03/25</p>
            </div>
          </div>
          <button className="font-semibold">Remove</button>
        </div>
        <p className="text-green-500 ml-4">+ Add a new payment method</p>
      </div>
    </div>
  );
}
