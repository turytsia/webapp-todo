import { useContext } from "react"
import { Routes as Router, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import WithToken from './components/common/WithToken/WithToken';
import WithoutToken from './components/common/WithoutToken/WithoutToken';
import NotFound from './components/NotFound/NotFound';
import Container from "./components/Container/Container";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import { Register } from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import Project from "./components/Project/Project"
import ProjectTask from "./components/ProjectTask/ProjectTask"


const Routes = () => {
  const {
    isAuth,
    token,
    onLogin,
    onLogout,
    onRegister
  } = useContext(AuthContext)



  const Home = () => <>Home</>

  return (
    <Container>
      <Header></Header>
      <Main>
        <AsideMenu isAuth={isAuth} />
        <Router>
          <Route path="/" element={
            <WithToken>
              <Dashboard />
            </WithToken>
          } />
          <Route path="/projects/create" element={
            <WithToken>
              <ProjectForm />
            </WithToken>
          } />
          <Route path="/projects/:id" element={
            <WithToken>
              <Project />
            </WithToken>
          } />
          <Route path="/projects/:id/project-tasks/:project_task_id" element={
            <WithToken>
              <ProjectTask />
            </WithToken>
          } />
          <Route path="/auth/login" element={
            <WithoutToken>
              <Login />
            </WithoutToken>
          } />
          <Route path="/auth/register" element={
            <WithoutToken>
              <Register />
            </WithoutToken>
          } />
          <Route path="*" element={<NotFound />} />
        </Router>
      </Main>
    </Container>
  );
}

export default Routes;
