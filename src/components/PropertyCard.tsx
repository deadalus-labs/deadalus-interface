import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function PropertyCard() {
    return (
        <Card className="bg-white max-w-[300px] sm:max-w-[500px] pt-5 pb-5">
            <CardContent className="pb-0 space-y-2.5">
                <div className='relative max-w-[300px] sm:max-w-[500px] max-h-[200px] sm:max-h-[350px] rounded-lg'>
                    <Image src='/property.png' alt='property image' width={500} height={350} />
                </div>
                <h3 className="text-slate-900 text-lg font-semibold">North Strathfield Concord West</h3>
            </CardContent>
        </Card>
    )
}