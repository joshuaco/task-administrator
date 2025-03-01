import { Request, Response } from 'express';
import UserModel from '../models/User';

class Team {
  static getMemberByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email }).select('id name email');

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static getProjectTeam = async (req: Request, res: Response) => {
    // No need of another Model request
    const { team } = await req.project.populate('team', 'id name email');
    res.status(200).json({ team });
  };

  static addMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const user = await UserModel.findById(id).select('id');

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (req.project.manager.toString() === user.id.toString()) {
        res
          .status(409)
          .json({ error: "The manager can't be added as a team member" });
        return;
      }

      if (req.project.team.some((team) => team.toString() === user.id)) {
        res.status(409).json({ error: 'User already exists in the project' });
        return;
      }

      req.project.team.push(user.id);
      await req.project.save();

      res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteMemberById = async (req: Request, res: Response) => {
    try {
      const { userID: id } = req.params;

      if (!req.project.team.some((team) => team.toString() === id)) {
        res.status(404).json({ error: 'User dont found' });
        return;
      }

      req.project.team = req.project.team.filter(
        (team) => team.toString() !== id
      );

      await req.project.save();
      res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default Team;
