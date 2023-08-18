import Image from 'next/image'

export default function LogoHeader() {
    return (

        <div className="flex flex-row items-center justify center pt-10">
            <Image
                src="/images/logo.svg"
                alt="Slumberjack Logo"
                className="logo"
                width={30}
                height={42}
                priority
            />
            <h1 className="text-2xl tracking-wide p-2">Slumber<span className="pewterblue">jack</span></h1>
        </div>

    )
}