using System;
using System.Collections.Generic;

namespace ScoutingReports.DataAccess.Models
{
    public partial class ScoutingReport
    {
        public int ReportKey { get; set; }
        public string ScoutName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Comment { get; set; }
        public int DefenseRate { get; set; }
        public int ReboundRate { get; set; }
        public int ShootingRate { get; set; }
        public int AssistRate { get; set; }
    }
}
