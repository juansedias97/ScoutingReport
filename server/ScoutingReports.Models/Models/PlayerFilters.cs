using System;
using System.Collections.Generic;
using System.Text;

namespace ScoutingReports.DataAccess.Models
{
    public class PlayerFilters
    {
        public bool Active { get; set; } = false;
        public string FirstName { get; set; } = null;
        public string LastName { get; set; } = null;
        public int TeamId { get; set; } = 0;
        public int SeasonId { get; set; } = 0;
    }
}
