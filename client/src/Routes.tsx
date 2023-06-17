import { Reducer, ReducerAction, useContext, useEffect, useReducer, useState } from "react"
import { Routes as Router, Route, Navigate, useNavigate } from 'react-router-dom';
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
import ProjectForm, { projectFormType } from "./components/ProjectForm/ProjectForm";
import Project, { projectTaskType } from "./components/Project/Project"
import ProjectTask, { taskType } from "./components/ProjectTask/ProjectTask"
import useFetch from "./hooks/use-fetch";
import { projectType } from "./components/ProjectList/ProjectList";
import { AxiosError } from "axios";

enum loadingActionType {
  projects,
  project,
  projectTask,
}

type loadingAction = {
  type: loadingActionType
  payload: boolean
}

type loadingState = {
  projects: boolean
  project: boolean
  projectTask: boolean
}

const initialLoading: loadingState = {
  projects: false,
  project: true,
  projectTask: true
}

/**
 * Loading reducer for specific loading
 * 
 * @param state loading state
 * @param action loading action
 * @returns new loading state
 */
const loadingReducer = (state: loadingState, action: loadingAction) => {
  switch (action.type) {
    case loadingActionType.projects:
      return { ...state, projects: action.payload }
    case loadingActionType.project:
      return { ...state, project: action.payload }
  }

  return state
}


/**
 *  Router component
 */
const Routes = () => {
  const { isAuth } = useContext(AuthContext)

  const navigate = useNavigate()
  const { get, post, update, remove } = useFetch()

  const [projects, setProjects] = useState<projectType[]>([])
  const [loading, dispatch] = useReducer<Reducer<loadingState, loadingAction>>(loadingReducer, initialLoading)

  // Requests

  /**
   * Fetches all the projects for the specific user
   */
  const fetchProjects = async () => {
    try {
      dispatch({ type: loadingActionType.projects, payload: true })
      const { projects } = await get('/projects/')
      setProjects(projects)
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) {
        // onLogout()
      }
    } finally {
      dispatch({ type: loadingActionType.projects, payload: false })
    }
  }

  /**
   * Fetches specific project by Id 
   * 
   * @param id project's id
   * @returns returns fetched project
   */
  const fetchProject = async (id: string | undefined) => {
    if (typeof id === 'undefined') return

    try {
      dispatch({ type: loadingActionType.project, payload: true })
      const { project } = await get(`/projects/${id}/`)
      return project
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: loadingActionType.project, payload: false })
    }
  }

  /**
   * Creates project and redirects user to id
   * 
   * @param data project's data
   */
  const createProject = async (data: projectFormType) => {
    try {
      const { project } = await post('/projects/', data)
      setProjects(prev => [...prev, project])
      navigate('/projects/' + project.id)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProject = async (id: number, data: projectFormType) => {
    try {
      const { project } = await update(`/projects/${id}/`, data)
      setProjects(prev => prev.map(p => p.id === project.id ? project : p))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProject = async (id: number) => {
    try {
      const { project } = await remove(`/projects/${id}/`)
      setProjects(prev => prev.filter(({ id: projectID }) => projectID !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProjectTask = async (projectID: string | undefined, projectTaskID: string | undefined) => {
    if (typeof projectID === 'undefined' || typeof projectTaskID === 'undefined') return

    try {
      dispatch({ type: loadingActionType.projectTask, payload: true })
      const { project_task } = await get(`/projects/${projectID}/project-tasks/${projectTaskID}/`)
      dispatch({ type: loadingActionType.projectTask, payload: false })
      return project_task
    } catch (error) {
      console.log(error)
    }
  }

  const createProjectTask = async (id: number, data: projectTaskType) => {
    try {
      const { project_task } = await post(`/projects/${id}/`, data)
      return project_task
    } catch (error) {
      console.log(error)
    }
  }

  const updateProjectTask = async (id: number, projectTaskID: number, data: projectTaskType) => {
    try {
      const { project_task } = await update(`/projects/${id}/project-tasks/${projectTaskID}/`, data)
      return project_task
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProjectTask = async (id: number, projectTaskID: number) => {
    try {
      const { project_task } = await remove(`/projects/${id}/project-tasks/${projectTaskID}/`)
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (projectID: number, projectTaskID: number, data: taskType) => {
    try {
      const { task } = await post(`/projects/${projectID}/project-tasks/${projectTaskID}/`, data)
      return task
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (projectID: number, projectTaskID: number, taskID: number, data: taskType) => {
    try {
      const { task } = await update(`/projects/${projectID}/project-tasks/${projectTaskID}/tasks/${taskID}/`, data)
      return task
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (projectID: number, projectTaskID: number, taskID: number) => {
    try {
      const { task } = await remove(`/projects/${projectID}/project-tasks/${projectTaskID}/tasks/${taskID}/`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { 
    if (isAuth) {
      fetchProjects()
    }
  }, [isAuth])

  return (
    <Container>
      <Header></Header>
      <Main>
        <AsideMenu
          isLoading={loading.projects}
          isAuth={isAuth}
          projects={projects} />
        <Router>
          <Route path="/" element={
            <WithToken>
              <Dashboard />
            </WithToken>
          } />
          <Route path="/projects/create" element={
            <WithToken>
              <ProjectForm onCreate={createProject} />
            </WithToken>
          } />
          <Route path="/projects/:projectID" element={
            <WithToken>
              <Project
                isLoading={loading.project}
                onDelete={deleteProject}
                onFetch={fetchProject}
                onUpdate={updateProject}
                onCreateTask={createProjectTask}
                onUpdateTask={updateProjectTask}
                onDeleteTask={deleteProjectTask} />
            </WithToken>
          } />
          <Route path="/projects/:projectID/project-tasks/:projectTaskID" element={
            <WithToken>
              <ProjectTask
                onFetch={fetchProjectTask}
                onUpdate={updateProjectTask}
                onDelete={deleteProjectTask}
                onCreateTask={createTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask} />
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
