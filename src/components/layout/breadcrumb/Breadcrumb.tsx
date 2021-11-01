import { Breadcrumb as AntdBreadcrumb, Col, Row } from "antd";
import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import type { AppRoute, RoutePath } from "../../../constants";
import { ROUTES } from "../../../constants";
import { useBreadcrumb } from "../../../hooks";
import classes from "./Breadcrumb.module.css";

type BreadcrumbItem = {
  content: string | null;
  icon?: React.ReactNode;
  path?: RoutePath;
};

export function Breadcrumb(): JSX.Element {
  const { pathname } = useLocation();
  const breadcrumb = useBreadcrumb();

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const pathChunks = pathname
      .split("/")
      .filter((pathChunk, index) => !!pathChunk || index === 0);

    return [
      ...pathChunks
        .map((_, index): BreadcrumbItem | null => {
          const chunkPath: RoutePath = `/${pathChunks
            .slice(1, index + 1)
            .join("/")}`;
          const chunkRoute: AppRoute | undefined = ROUTES[chunkPath];

          return !chunkRoute
            ? null
            : {
                content: chunkRoute.title,
                icon: chunkRoute.icon,
                path: chunkPath,
              };
        })
        .filter((item): item is BreadcrumbItem => !!item),
      ...breadcrumb.extra.map((extra) => ({ content: extra })),
    ];
  }, [pathname, breadcrumb.extra]);

  return (
    <Row className={classes.Container}>
      <Col md={24} xs={0}>
        <AntdBreadcrumb className={classes.Breadcrumb}>
          {breadcrumbItems.length > 1 &&
            breadcrumbItems.map(
              (breadcrumbItem) =>
                breadcrumbItem && (
                  <AntdBreadcrumb.Item key={nanoid()}>
                    <Link
                      className={!breadcrumbItem.path ? classes.Disabled : ""}
                      to={breadcrumbItem.path || ""}
                    >
                      {breadcrumbItem.icon && (
                        <span
                          className={
                            breadcrumbItem.content ? classes.Icon : undefined
                          }
                        >
                          {breadcrumbItem.icon}
                        </span>
                      )}
                      {breadcrumbItem.content}
                    </Link>
                  </AntdBreadcrumb.Item>
                )
            )}
        </AntdBreadcrumb>
      </Col>
    </Row>
  );
}
