import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
// @mui
import Collapse from "@mui/material/Collapse";
// routes
//
import NavItem from "./nav-item";
import { usePathname } from "../../../routes/hooks";

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
  const pathname = usePathname();

  const [open, setOpen] = useState();

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        onClick={handleToggle}
        config={config}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} config={config} />
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  config: PropTypes.object,
  data: PropTypes.object,
  depth: PropTypes.number,
  hasChild: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, config }) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}

NavSubList.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  depth: PropTypes.number,
};
