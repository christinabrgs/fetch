
import express, { type Request, type Response } from 'express';
const router = express.Router()
import { db } from '../database';

interface dogIdRequest {
    dogId: string
}

router.post('/save', async (req: Request, res: Response) => {
    try {
        const { dogId } = req.body;

        if (!dogId) {
            res.status(400).json({ error: 'Missing dogId' });
            return
        }

        db.run('INSERT INTO dogs (id) VALUES (?)', [dogId], (err: Error) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving dog' });
            }
            res.json({ message: 'Dog saved successfully', dogId });
        });
    } catch (err) {
        console.error('error saving dog', err)
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/matched', async (req: Request, res: Response) => {
    try {
        db.all('SELECT id FROM dogs', [], (err: Error, rows: { id: string }[]) => {
            if (err) {
                res.status(500).json({ error: "Error retrieving saved dogs" })
                return
            }

            const dogIds = rows.map((row) => row.id)
            res.json({ matchedDogs: dogIds })
        })
    } catch (err) {
        console.error('error retrieving dog', err)
        res.status(500).json({ error: 'Server error' });
    }
})


router.delete('/remove/:dogId', async (req: Request, res: Response) => {
    try {
        const { dogId } = await req.params
        db.run("DELETE FROM dogs WHERE id = ?", [dogId], (err: Error) => {
            if (err) {
                res.status(500).json({ error: 'Error removing dog' })
                return
            }
            res.json({ message: "Dog removed successfully" })
        })
    } catch (err) {
        console.error('error deleting dog', err)
        res.status(500).json({ error: 'Server error' });
    }
})



export default router