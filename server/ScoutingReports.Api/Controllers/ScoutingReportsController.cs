using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ScoutingReports.DataAccess.Models;
using ScoutingReports.DataAccess.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScoutingReports.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoutingReportsController : ControllerBase
    {
        private readonly IScoutingReportsServices _reportServices;

        public ScoutingReportsController(IScoutingReportsServices reportServices)
        {
            _reportServices = reportServices;
        }

        [HttpGet("GetActiveUsers")]
        public IActionResult GetActiveUsers()
        {
            return Ok(_reportServices.GetActiveUsers());
        }

        [HttpPost]
        [Route("CreateScoutingReport")]
        public IActionResult CreateScoutingReport(ScoutingReport report)
        {
            ScoutingReport createdReport = _reportServices.CreateScoutingReport(report);
            if(createdReport != null)
            {
                return Ok(GetScoutingReports(0));
            }

            return NotFound("Error Creating New Scouting Report");
        }

        [HttpGet("GetScoutingReports/{id?}")]
        public IActionResult GetScoutingReports(int id)
        {
            return Ok(_reportServices.GetScoutingReports(id));
        }

        [HttpPut("UpdateScoutingReport/{id}")]
        public IActionResult UpdateScoutingReport(int id, ScoutingReport report)
        {
            ScoutingReport updatedReport = _reportServices.UpdateScoutingReport(id, report);
            
            if(updatedReport != null)
            {
                return Ok(GetScoutingReports(0));
            }

            return NotFound("Error Processing Update");
        }

        [HttpPut("DeleteScoutingReport/{id}")]
        public IActionResult DeleteScoutingReport(int id)
        {
            ScoutingReport deletedReport = _reportServices.DeleteScoutingReport(id);


            if (deletedReport != null)
            {
                return Ok(GetScoutingReports(0));
            }

            return NotFound("Report Has Already been deleted or does not exist");
        }

        [HttpGet("GetLeagues")]
        public IActionResult GetLeagues()
        {
            return Ok(_reportServices.GetLeagues());
        }

        [HttpGet("GetTeams/{leagueId?}")]
        public IActionResult GetTeams(int leagueId)
        {
            return Ok(_reportServices.GetTeams(leagueId));
        }
        [HttpGet("GetAllPlayers")]
        public IActionResult GetAllPlayers()
        {
            return Ok(_reportServices.GetAllPlayers());
        }

        [HttpGet("GetFilteredPlayers")]
        public IActionResult GetFilteredPlayers(PlayerFilters filters)
        {
            return Ok(_reportServices.GetFilteredPlayers(filters));
        }
    }
}
