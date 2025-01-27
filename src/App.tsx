import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp, ConfigProvider } from "antd";
import { appwriteClient, authProvider } from "./utility";
import {
  ParticipantCreate,
  ParticipantList,
  ParticipantShow,
  ParticipantEdit,
} from "./pages/participants";
import {
  ContactCreate,
  ContactList,
  ContactShow,
  ContactEdit,
} from "./pages/contacts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: "678f8374002347bdd52f",
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "678f8374002347bdd52f",
            })}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "678f837f00108cba6778",
                list: "/participants",
                create: "/participants/create",
                show: "/participants/show/:id",
                edit: "/participants/edit/:id",
                meta: {
                  label: "Participants",
                },
              },
              {
                name: "679030d2003cbaa1e753",
                list: "/contacts",
                create: "/contacts/create",
                show: "/contacts/show/:id",
                edit: "/contacts/edit/:id",
                meta: {
                  label: "Contacts",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              liveMode: "auto",
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="678f837f00108cba6778" />}
                />

                <Route path="/participants">
                  <Route index element={<ParticipantList />} />
                  <Route path="create" element={<ParticipantCreate />} />
                  <Route path="edit/:id" element={<ParticipantEdit />} />
                  <Route path="show/:id" element={<ParticipantShow />} />
                </Route>

                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="create" element={<ContactCreate />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="678f837f00108cba6778" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      formProps={{
                        initialValues: {
                          remember: false,
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
