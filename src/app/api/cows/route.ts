import dbConnect from '@/lib/dbConnect';
import CowModel, { Cow } from '@/model/Cow';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { User } from 'next-auth';

export async function POST(request: Request) {
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
        const { tag, breed, dob, isAvailable } = await request.json();
        const cow = new CowModel({ tag, breed, dob, isAvailable });
        await cow.save();
        console.log("Cow Added", cow)
        return Response.json(
            {
                success: true,
                message: 'Cow added successfully',
                cow: cow,
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
export async function GET(request: Request) {
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
        const cows = await CowModel.find().exec();
        return Response.json(
            {
                success: true,
                message: 'Cow retrieved successfully',
                cows: cows,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error loading cows' },
            { status: 500 }
        );
    }


}
