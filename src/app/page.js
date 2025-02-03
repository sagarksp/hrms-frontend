import { cookies } from 'next/headers';
import Image from 'next/image';
import ClientLogin from './ClientLogin';

export default async function LoginPage() {
    const cookie = await cookies(); // Await the cookies function
    const hasAccess = cookie.get('hasAccess')?.value || null;
    console.log('Has Access:', hasAccess);

    return (
        <>

        <header className="bg-black text-white  flex items-center h-12 px-4  shadow-[1px_-2px_20px_-2px] shadow-green-500 ">
            <div className="text-lg font-bold">Gigantic Portal</div>
        </header>

        <div className="flex flex-col md:flex-row min-h-[90vh] px-5 gap-10 mt-1"> 
            {/* Left Box: Image */}
            <div className="flex justify-center items-center flex-1 bg-gray-100  p-5 rounded-md
            
            ">
                <Image
                    src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1712056290~exp=1712056890~hmac=80c1414be8073b0bee4e373c05ca9885f5e35a2f4e91f95c6d0d247ad9bfe6f2"
                    alt="Login Illustration"
                    width={500}
                    height={500}
                    className="max-w-full h-auto rounded-lg"
                />
            </div>

            {/* Right Box: Input Fields */}
            <div className="flex flex-col justify-center items-center flex-1 bg-white p-5 rounded-md shadow-md w-full max-w-md">
                <ClientLogin /> {/* Client-side component rendered here */}
            </div>
        </div>
        </>
    );
}





