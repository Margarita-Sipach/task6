import React, { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRouter = memo(() => {
    const isAuth = true;

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        const isAuthOnly = route.authOnly;
        return !(isAuthOnly && !isAuth);
    }), [isAuth]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback="Loading...">
                            <div className="page-wrapper">{element}</div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
});
