import { Link } from '@/i18n/routing';

const NotFound = () => {
    return (
        <html>
            <body>
                <div>
                    <h2>Not Found</h2>
                    <p>Could not find requested resource</p>
                    <Link href={'/'}>Return Home</Link>
                </div>
            </body>
        </html>
    );
};

export default NotFound;
