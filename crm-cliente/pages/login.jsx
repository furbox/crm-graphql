import Layout from '../components/Layout';

const Login = () => (
  <div>
    <Layout>
      <h1 className="text-2xl text-center text-gray-50 font-light">Iniciar Sesión</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-900 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" required placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-gray-900 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" required placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <input type="submit" className="bg-gray-900 border rounded w-full mt-5 p-2 text-gray-50 uppercase hover:bg-gray-50 hover:text-gray-900 hover:border-gray-900" value="Iniciar Sesión" />
          </form>
        </div>
      </div>
    </Layout>
  </div>
)

export default Login;