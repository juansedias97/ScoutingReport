using ScoutingReports.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace ScoutingReports.DataAccess.Services
{
    public interface IScoutingReportsServices
    {
        List<User> GetActiveUsers();
        ScoutingReport CreateScoutingReport(ScoutingReport report);
        List<ScoutingReport> GetScoutingReports(int id);
        ScoutingReport UpdateScoutingReport(int id, ScoutingReport report);
        ScoutingReport DeleteScoutingReport(int id);
        List<League> GetLeagues();
        List<Team> GetTeams(int leagueId);
        List<Player> GetAllPlayers();
        IQueryable<Player> GetFilteredPlayers(PlayerFilters filters);
    }
}
