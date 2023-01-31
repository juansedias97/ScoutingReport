using Microsoft.EntityFrameworkCore;
using ScoutingReports.DataAccess.Data;
using ScoutingReports.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScoutingReports.DataAccess.Services
{
    public class ScoutingReportsServices : IScoutingReportsServices
    {
        private AppDbContext _db;

        public ScoutingReportsServices (AppDbContext db)
        {
            _db = db;
        }
        public List<User> GetActiveUsers()
        {
            List<User> users = new List<User>();
            users = _db.User.Where(user => user.ActiveFlag == true).ToList();
            return users;
        }
        public ScoutingReport CreateScoutingReport(ScoutingReport report)
        {
            if(report != null)
            {
                _db.Add(report);
                _db.SaveChanges();
                return report;
            }

            return null;
        }
        public List<ScoutingReport> GetScoutingReports(int id)
        {
            List<ScoutingReport> reports = new List<ScoutingReport>();
            if(id != 0)
            {
                reports = _db.ScoutingReport.Where(report => report.ReportKey == id && report.ActiveFlag != false).ToList();
            }
            else
            {
                reports = _db.ScoutingReport.Where(report => report.ActiveFlag != false).OrderByDescending(r=> r.CreatedAt).ToList();
            }

            return reports;
        }
        public ScoutingReport UpdateScoutingReport(int id, ScoutingReport report)
        {
            ScoutingReport updatedReport = _db.ScoutingReport.Where(r => r.ReportKey == id).FirstOrDefault();

            if(updatedReport != null)
            {
                updatedReport.Comment = report.Comment;
                updatedReport.DefenseRate = report.DefenseRate;
                updatedReport.ReboundRate = report.ReboundRate;
                updatedReport.ShootingRate = report.ShootingRate;
                updatedReport.AssistRate = report.AssistRate;
                updatedReport.UpdatedAt = DateTime.Now;

                _db.SaveChanges();
                return updatedReport;
            }

            return null;
        }
        public ScoutingReport DeleteScoutingReport(int id)
        {
            ScoutingReport deletedReport = _db.ScoutingReport.Where(r => r.ReportKey == id && r.ActiveFlag == true).FirstOrDefault();

            if(deletedReport != null)
            {
                deletedReport.ActiveFlag = false;
                _db.SaveChanges();
                return deletedReport;
            }

            return null;
        }
        public List<League> GetLeagues()
        {
            List<League> leagues = new List<League>();
            try
            {
               leagues = _db.League.ToList();
            }
            catch (Exception ex)
            {
            }
            return leagues;
        }
        public List<Team> GetTeams(int leagueId)
        {
            List<Team> teams = new List<Team>();
            if (leagueId != 0)
            {
                teams = _db.Team.Where(team => team.LeagueKey == leagueId).ToList();
            }
            else
            {
                teams = _db.Team.ToList();
            }
            return teams;
        }
        public List<Player> GetAllPlayers()
        {
            return _db.Player.OrderBy(s=> s.FirstName).ToList();
        }
        public IQueryable<Player> GetFilteredPlayers(PlayerFilters filters)
        {
            IQueryable<Player> result;

            if (filters.Active)
            {
                result = from player in _db.Player
                         join teamP in _db.TeamPlayer
                         on player.PlayerKey equals teamP.PlayerKey
                         where (filters.Active == teamP.ActiveTeamFlg)
                               && (player.FirstName == filters.FirstName || filters.FirstName == null)
                               && (player.LastName == filters.LastName || filters.LastName == null)
                               && (teamP.TeamKey == filters.TeamId || filters.TeamId == 0)
                               && (teamP.SeasonKey == filters.SeasonId || filters.SeasonId == 0)
                         select player;
            }
            else
            {
                result = from player in _db.Player
                         join teamP in _db.TeamPlayer
                         on player.PlayerKey equals teamP.PlayerKey
                         where (player.FirstName == filters.FirstName || filters.FirstName == null)
                               && (player.LastName == filters.LastName || filters.LastName == null)
                               && (teamP.TeamKey == filters.TeamId || filters.TeamId == 0)
                               && (teamP.SeasonKey == filters.SeasonId || filters.SeasonId == 0)
                         select player;
            }

            return result;
        }
    }
}
