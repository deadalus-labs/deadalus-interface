"use client";

import { Disclosure } from "@headlessui/react";
import { X, Menu } from "lucide-react";
import ConnectWallet from "@/components/layout/connect";
import { navigation } from "@/lib/constants/misc";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-full">
			<Disclosure
				as="nav"
				className="border-b border-gray-200 bg-white"
			>
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 justify-between">
								<div className="flex">
									<div className="flex flex-shrink-0 items-center">
										<img
											className="block h-8 w-auto lg:hidden"
											src="/bg-deadalus-logo.png"
											alt="Deadalus Logo"
										/>
										<img
											className="hidden h-8 w-auto lg:block"
											src="/bg-deadalus-logo.png"
											alt="Deadalus Logo"
										/>
									</div>
									<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={cn(
													item.current
														? "border-indigo-500 text-gray-900"
														: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
													"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
								<div className="hidden sm:ml-6 sm:flex sm:items-center">
									<ConnectWallet size="sm" />
								</div>
								<div className="-mr-2 flex items-center sm:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<X
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Menu
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 pb-3 pt-2">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={cn(
											item.current
												? "border-indigo-500 bg-indigo-50 text-indigo-700"
												: "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
											"block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
							<div className="border-t border-gray-200 pb-3 pt-4 ml-4">
								<ConnectWallet size="sm" />
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<div className="py-10">
				<main>
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</div>
	);
};

export default Header;
