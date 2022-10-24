import express, {Router} from "express";
import cors from 'cors'
import multer from "multer";
import cloudinary from 'cloudinary'

const PORT = 5000;
const app = express();

app.use(cors({
  'origin':'*'
}))

const router = Router();

app.use(express.json({limit: '50mb'}))
app.use(router);

app.listen(PORT, () => console.log(`Sever listening on PORT ${PORT}`))

app.post("/audio/upload", async (req, res) => {
  // Get the file name and extension with multer
  const file = req.body.audio;

  const cloud = cloudinary.v2;
  cloud.config({ 
    cloud_name: 'juancarlos', 
    api_key: '741934352396129', 
    api_secret: 'zJh5VEmeEJEtdsLeuaL5_BrMvj4' 
  });

  cloud.uploader.upload(
    `data:image/png;base64,${file}`, 
    { resource_type: "video", folder: `audiofiles/`, overwrite: true },
    (error, result) => {
      if (error) res.status(500).json(error);
      else {
        console.log(result.duration)
        res.status(200).json({fileUrl: result.secure_url});
      }
    }
  );
});

