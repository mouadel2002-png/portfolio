import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { MaskLine } from '../components/Reveal';
import './pages.css';

export default function NotFound() {
  return (
    <Page title="Page not found">
      <section className="container not-found">
        <h1 className="display">
          <MaskLine>404</MaskLine>
        </h1>
        <p className="muted">This page doesn't exist.</p>
        <Link to="/" className="link-hover">
          Back home
        </Link>
      </section>
    </Page>
  );
}
