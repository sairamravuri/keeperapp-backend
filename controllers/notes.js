const db = require("../helpers/dbconnection");

async function addNotes(data) {
  const added = await db.notes.create({
    user_id: data.user_id,
    title: data.newNote.title,
    content: data.newNote.content,
  });
  const message = "unable to add";
  if (!added) return message;
  return added;
}

async function getNotes(data) {
  const notes = await db.notes.findAll({
    where: { user_id: data.user_id },
  });
  return notes;
}

async function deleteNotes(data) {
  const [numRowsUpdated, _] = await db.notes.destroy({
    where: {
      id: data.id,
    },
  });
  if (numRowsUpdated > 0) return { message: "success" };
  return { message: "failed" };
}

module.exports = {
  addNotes,
  getNotes,
  deleteNotes,
};
