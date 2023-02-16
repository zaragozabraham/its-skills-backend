import { createOpinion, deleteOpinion, getAllOpinions, getOpinionById, updateOpinion } from './controllers/opinion';
import { getAllSubjects, createSubject, getSubjectById, updateSubject, deleteSubject } from './controllers/subject';
import express from 'express';
import cors from 'cors';
import { run } from './modules/db';
import { createUser, getAllUsers, login, getUserByID } from './controllers/user';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("secretKey", process.env.SECRET_KEY);

app.get('/', (req, res)=>{
    res.send('Express Server')
})

app.get('/opinion', async (req, res) => {
  const opinions = await getAllOpinions();
  res.send(opinions);
});

app.post('/opinion', async (req, res) => {
  const opinion = await createOpinion(req.body);
  res.send(opinion);
});

app.get('/opinion/:id', async (req, res) => {
  const opinion = await getOpinionById({id: req.params.id});
  res.send(opinion);
});

app.patch('/opinion/:id', async (req, res) => {
  const opinion = await updateOpinion({
    id: req.params.id,
    ...req.body
  });
  res.send(opinion);
});

app.delete('/opinion/:id', async (req, res) => {
  const opinion = await deleteOpinion({
    id: req.params.id
  });
  res.send(opinion);
});

app.get('/subject', async (req, res) => {
  const subjects = await getAllSubjects();
  res.send(subjects);
});

app.post('/subject', async (req, res) => {
  const subject = await createSubject(req.body);
  res.send(subject);
})

app.get('/subject/:id', async (req, res) => {
  const subject = await getSubjectById({id: req.params.id });
  res.send(subject);
})

app.patch('/subject/:id', async (req, res) => {
  const subject = updateSubject({
    id: req.params.id,
    ...req.body,
  })
  res.send(subject)
});

app.delete('/subject/:id', async (req, res) => {
  const subject = await deleteSubject({
    id: req.params.id
  })

  res.send(subject)
});

app.post("/users", async (req, res) => {
  const user = await createUser(req.body);

  res.send(user);
});

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.send(user);
})

app.post("/auth", async (req, res) => {
  const usuario = await login(req.body);

  if (usuario.status) {
    res.status(usuario.status);
    res.send({
      error: usuario.error,
    });
  } else {
    res.send(usuario);
  }
});

app.listen(8000, async ()=>{
    await run();
    console.log('Server Ready 🚀');
});