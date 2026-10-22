import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { MaskLine } from '../components/Reveal';
import './pages.css';
import { useLang } from '../i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <Page title="Page not found">
      <section className="container not-found">
        <h1 className="display">
          <MaskLine>404</MaskLine>
        </h1>
        <p className="muted">{t('notFound')}</p>
        <Link to="/" className="link-hover">
          {t('backHome')}
        </Link>
      </section>
    </Page>
  );
}
