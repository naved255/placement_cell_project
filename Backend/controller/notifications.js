import db from "../init/index.js"
import { v4 as uuidv4 } from 'uuid';

export const postNotifications = async (req, res) => {
  try {
    console.log("Received:");

    let { receiver, title, message} = req.body;
    let {userId} = req.user;
   

    const notificationId = uuidv4();

    const query = `
      INSERT INTO notifications 
      (notification_id, officer_id, receiver, title, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [notificationId, userId, receiver, title, message];

    console.log(values);

    await db.execute(query, values);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      notification_id: notificationId,
    });

  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export const getStudentNotifications = async (req, res) => {
  try {
    const query = `
      SELECT notification_id, title, message, created_at
      FROM notifications
      WHERE receiver IN ('students', 'both')
      ORDER BY created_at DESC
    `;

    const [rows] = await db.execute(query);

    res.status(200).json({
      success: true,
      notifications: rows,
    });

  } catch (error) {
    console.error("Error fetching student notifications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const getCompanyNotifications = async (req, res) => {
  try {
    const query = `
      SELECT notification_id, title, message, created_at
      FROM notifications
      WHERE receiver IN ('companies', 'both')
      ORDER BY created_at DESC
    `;

    const [rows] = await db.execute(query);

    res.status(200).json({
      success: true,
      notifications: rows,
    });

  } catch (error) {
    console.error("Error fetching company notifications:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};