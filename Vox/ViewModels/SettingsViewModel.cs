﻿using System;

namespace JabbR.ViewModels
{
    public class SettingsViewModel
    {
        public string Host { get; set; }
        public bool UseSecureChannel { get; set; }

        public string GoogleAnalytics { get; set; }
        public string Sha { get; set; }
        public string Branch { get; set; }
        public string Time { get; set; }
        public bool DebugMode { get; set; }
        public Version Version { get; set; }
        public bool IsAdmin { get; set; }
        public string ClientLanguageResources { get; set; }
        public int MaxMessageLength { get; set; }
     
        public bool ShowDetails
        {
            get
            {
                return !String.IsNullOrEmpty(Sha) && !String.IsNullOrEmpty(Branch) && !String.IsNullOrEmpty(Time);
            }
        }
    }
}