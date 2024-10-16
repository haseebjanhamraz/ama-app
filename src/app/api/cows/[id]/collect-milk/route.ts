import dbConnect from '@/lib/dbConnect';
import MilkModel, { Milk } from '@/model/Milk';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { User } from 'next-auth';


export async function POST(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params
    // const session = await getServerSession(authOptions);
    // const user: User = session?.user;
    // if (!session || !session.user) {
    //     return Response.json(
    //         { success: false, message: 'Not authenticated' },
    //         { status: 401 }
    //     );
    // }
    try {
        const { date, shift, quantity } = await request.json();
        const milk = new MilkModel({
            cowId: id,
            date,
            shift,
            quantity,
        });
        await milk.save();
        console.log("Milk Record Added", milk)
        return Response.json(
            {
                success: true,
                message: 'Milk record added successfully',
                data: milk
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: 'Error adding new cow' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    // const session = await getServerSession(authOptions);
    // const user: User = session?.user;
    // if (!session || !session.user) {
    //     return Response.json(
    //         { success: false, message: 'Not authenticated' },
    //         { status: 401 }
    //     );
    // }
    try {
        const { id } = params
        const milk = await MilkModel.find({ cowId: id }).exec();
        console.log("Milk Record Retrieved for", id)
        return Response.json(
            {
                success: true,
                message: `Milk record for cow: ${id}`,
                data: milk

            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: 'Error retrieving cow milk record' },
            { status: 500 }
        );
    }
}
