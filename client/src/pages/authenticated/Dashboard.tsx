const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl">
        <h1 className="my-4 mb-6 text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 row-span-2 rounded-lg bg-blue-200 p-6">
            <h2 className="mb-2 text-xl font-semibold">Featured Content</h2>
            <p>This is a large card that spans two columns and two rows.</p>
          </div>

          <div className="rounded-lg bg-green-200 p-4">
            <h3 className="mb-2 font-semibold">Card 1</h3>
            <p>Regular sized card.</p>
          </div>

          <div className="rounded-lg bg-yellow-200 p-4">
            <h3 className="mb-2 font-semibold">Card 2</h3>
            <p>Another regular card.</p>
          </div>

          <div className="col-span-2 rounded-lg bg-pink-200 p-4">
            <h3 className="mb-2 font-semibold">Wide Card</h3>
            <p>This card spans two columns.</p>
          </div>

          <div className="rounded-lg bg-purple-200 p-4">
            <h3 className="mb-2 font-semibold">Card 3</h3>
            <p>Yet another card.</p>
          </div>

          <div className="rounded-lg bg-red-200 p-4">
            <h3 className="mb-2 font-semibold">Card 4</h3>
            <p>Last card in the grid.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
