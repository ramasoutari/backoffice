import { Helmet } from 'react-helmet-async';
import { useLocales } from '../locales';
import View403 from '../sections/error/403-view';

// ----------------------------------------------------------------------

export default function NoPermissionsPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title>{t("screen_403", {
          systemName: t("system_name")
        })}</title>
      </Helmet>

      <View403 />
    </>
  );
}
