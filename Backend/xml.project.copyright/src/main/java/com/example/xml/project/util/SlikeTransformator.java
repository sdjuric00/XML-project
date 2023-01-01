package com.example.xml.project.util;

import com.example.xml.project.exception.TransformationFailedException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

import static com.example.xml.project.util.Constants.PHOTOS_FILE_PATH;
import static com.example.xml.project.util.Constants.TARGET_PHOTO_FILE_PATH;

public class SlikeTransformator {

    private static String generateBase64String(final byte[] pictureData) {

        return Base64.getEncoder().encodeToString(pictureData);
    }

    public static String generatePhotoPath(final String name) {

        return PHOTOS_FILE_PATH + name;
    }

    public static String generateSavePhotoPath(final String name) {

        return TARGET_PHOTO_FILE_PATH + name;
    }

    public static String generatePhotoName() {
        LocalDateTime vreme = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy_HH-mm-ss");

        return String.format("a-%s.png", vreme.format(formatter));
    }

    public static byte[] getPictureDataByName(final String name) throws IOException
    {
        return Files.readAllBytes(Paths.get(generatePhotoPath(name)));
    }

    public static String convertPictureToBase64ByName(final String name) {
        try {
            byte[] pictureData = new byte[0];
            pictureData = getPictureDataByName(name);

            return generateBase64String(pictureData);
        } catch (IOException e) {
            return "";
        }
    }

    private static void savePictureFromBase64(final String pictureName, final String base64) throws TransformationFailedException {
        try{
            byte[] image = Base64.getDecoder().decode(base64);
            OutputStream out = new FileOutputStream(generateSavePhotoPath(pictureName));
            out.write(image);
            out.flush();
            out.close();

        } catch (Exception e) {
            throw new TransformationFailedException("Profile picture update failed, try again later.");
        }
    }

    public static String sacuvajSliku(final String base64Opt) throws TransformationFailedException {
        String imeSlike = generatePhotoName();
        savePictureFromBase64(imeSlike, base64Opt);

        return imeSlike;
    }
}
