import dbConnect from '@/lib/dbConnect';
import CowModel, { Cow } from '@/model/Cow';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { User } from 'next-auth';

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const { tag, breed, dob, isAvailable } = await request.json();
        const cow = new CowModel({ tag, breed, dob, isAvailable });
        await cow.save();
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
    }
}
