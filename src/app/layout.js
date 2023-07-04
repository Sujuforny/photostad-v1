import Navbar from "@/components/Navbar"
import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"
import Provider from "./Provider"
import AuthProvider from "./AuthProvider"
import ReduxProvider from "@/redux/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReduxProvider>
					<Provider>
						<AuthProvider>
							<Navbar />
							<div className='bg-white dark:bg-black'>{children}</div>
							<Footer />
						</AuthProvider>
					</Provider>
				</ReduxProvider>
			</body>
		</html>
	)
}
