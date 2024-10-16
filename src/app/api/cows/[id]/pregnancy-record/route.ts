import dbConnect from '@/lib/dbConnect';
import VaccineModel from '@/model/Vaccine';
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
        const { date, vaccineName } = await request.json();
        const vaccine = new VaccineModel({
            cowId: id,
            date,
            vaccineName,
        });
        await vaccine.save();
        console.log("Vaccine Record Added", vaccine)
        return Response.json(
            {
                success: true,
                message: 'Vaccine record added successfully',
                data: vaccine
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: 'Error adding new vaccine record' },
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
        const milk = await VaccineModel.find({ cowId: id }).exec();
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
