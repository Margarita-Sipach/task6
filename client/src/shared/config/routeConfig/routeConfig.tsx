import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PaintPage } from 'pages/PaintPage';
import { RouteProps } from 'react-router-dom';

type AppRoutesProps = RouteProps & {
	authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
	PAINT = 'paint',

	// last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PAINT]: '/paint',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.PAINT]: {
        path: `${RoutePath.paint}/:id`,
        element: <PaintPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
