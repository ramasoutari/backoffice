import CustomDrawer from '../custom-drawer/custom-drawer';
import { useGlobalDrawerContext } from './context';
// hooks

// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function GlobalDrawer() {
  const globalDrawer = useGlobalDrawerContext();

  return (
    <>
      <CustomDrawer
        open={globalDrawer.open}
        backdrop={globalDrawer.backdrop}
        closeOnBackdrop={globalDrawer.closeOnBackdrop}
        onClose={globalDrawer.onClose}
        anchor="left"
        title={globalDrawer.title}
        renderRightOptions={globalDrawer.renderRightOptions}
      >
        {globalDrawer.content}
      </CustomDrawer>
    </>
  );
}
