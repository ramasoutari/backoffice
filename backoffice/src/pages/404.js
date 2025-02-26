import { Helmet } from 'react-helmet-async';
import NotFoundView from '../sections/error/not-found-view';
// sections

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
