import Link from 'next/link';

export default function NotFound(){
    return (
        <div className='componentGroup'>
            <h2>Opps</h2>
            <p>The page you are trying to reach doesn't exist</p>
            <Link href='/'>Go to Dashboard</Link>
        </div>
    );
}