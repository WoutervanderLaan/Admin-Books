const Dashboard = async () => {
  await new Promise((resolve) =>
    setTimeout(() => resolve('PLACEHOLDER DATA'), 2000)
  )

  return (
    <div className="container flex h-full items-center justify-center">
      Dashboard
    </div>
  )
}

export default Dashboard
