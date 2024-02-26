import React from 'react'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const FractionalNFTDisplay = () => {
  const counters = ["Counter 1", "Counter 2", "Counter 3", "Counter 4"];
  return (
		<div className="flex-1 h-fit border-2 border-slate-800 rounded-lg">
			<Tabs defaultValue="history">
				<TabsList className="bg-transparent border-b-2 border-slate-800 w-full flex justify-start rounded-b-none">
					<TabsTrigger
						value="history"
						className="data-[state=active]:bg-transparent data-[state=active]:text-slate-400 
							data-[state=active]:underline data-[state=active]:underline-offset-[13.5px] data-[state=active]:decoration-[#16A24A] 
							font-medium text-base"
					>
						Access History
					</TabsTrigger>
					<TabsTrigger
						value="transaction"
						className="data-[state=active]:bg-transparent data-[state=active]:text-slate-400 
							data-[state=active]:underline data-[state=active]:underline-offset-[13.5px] data-[state=active]:decoration-[#16A24A] 
							font-medium text-base"
					>
						Counter Transaction
					</TabsTrigger>
				</TabsList>
				<TabsContent value="history">
					<Table className="w-full">
						<TableHeader>
							<TableRow className="hover:bg-transparent flex border-transparent justify-between items-center">
								<TableHead className="text-slate-400 text-lg flex items-center font-normal">
									Timestamp
								</TableHead>
								<TableHead className="text-slate-400 text-lg flex items-center font-normal">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{counters.map((counter, i) => (
								<TableRow
									key={i}
									className="hover:bg-transparent border-slate-800 border-t-2
									flex justify-between items-center"
								>
									<TableCell className="text-base font-normal text-slate-50">
										{counter}
									</TableCell>
									<TableCell className="text-base font-normal text-slate-50">
										{counter}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>
				<TabsContent value="transaction">
					<Table className="w-full">
						<TableHeader>
							<TableRow className="hover:bg-transparent flex border-transparent justify-between items-center">
								<TableHead className="text-slate-400 text-lg flex items-center font-normal">
									Timestamp
								</TableHead>
								<TableHead className="text-slate-400 text-lg flex items-center font-normal">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{counters.map((counter, i) => (
								<TableRow
									key={i}
									className="hover:bg-transparent border-slate-800 border-2 flex justify-between items-center"
								>
									<TableCell className="text-base font-normal text-slate-50">
										{counter}
									</TableCell>
									<TableCell className="text-base font-normal text-slate-50">
										{counter}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default FractionalNFTDisplay;