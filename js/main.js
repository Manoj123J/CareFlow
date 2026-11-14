/**
 * CareFlow — Shared Client Utilities (main.js)
 * ---------------------------------------------------------------------------
 * Provides accessible mobile navigation, toast alerts, safe text escaping,
 * robust try/catch localStorage helpers for file:// compatibility, and CDN fallbacks.
 */

(function (window) {
    'use strict';

    // -----------------------------------------------------------------------
    // 1. Robust LocalStorage Repository (Wrapped in try/catch)
    // -----------------------------------------------------------------------
    var KEY_SAVED_CAMPS = 'careflow_saved_camps';
    var KEY_PENDING_CAMPS = 'careflow_pending_camps';
    var KEY_PENDING_DONORS = 'careflow_pending_donors';
    var KEY_REPORTS = 'careflow_reports';

    var inMemoryStorage = {};

    var CareFlowStorage = {
        getItem: function (key) {
            try {
                if (typeof window.localStorage !== 'undefined') {
                    return window.localStorage.getItem(key);
                }
            } catch (e) {
                console.warn('CareFlow: LocalStorage access blocked, using memory fallback.', e);
            }
            return inMemoryStorage[key] || null;
        },

        setItem: function (key, val) {
            try {
                if (typeof window.localStorage !== 'undefined') {
                    window.localStorage.setItem(key, val);
                    return true;
                }
            } catch (e) {
                console.warn('CareFlow: LocalStorage write blocked, using memory fallback.', e);
            }
            inMemoryStorage[key] = val;
            return true;
        },

        // Saved Camps (Bookmarks)
        getSavedCampIds: function () {
            var raw = this.getItem(KEY_SAVED_CAMPS);
            if (!raw) return [];
            try {
                return JSON.parse(raw);
            } catch (e) {
                return [];
            }
        },

        isCampSaved: function (campId) {
            return this.getSavedCampIds().indexOf(campId) !== -1;
        },

        toggleSaveCamp: function (campId) {
            var list = this.getSavedCampIds();
            var idx = list.indexOf(campId);
            var saved = false;
            if (idx === -1) {
                list.push(campId);
                saved = true;
            } else {
                list.splice(idx, 1);
                saved = false;
            }
            this.setItem(KEY_SAVED_CAMPS, JSON.stringify(list));
            return saved;
        },

        // Community Submissions (Mock)
        addPendingCamp: function (camp) {
            var raw = this.getItem(KEY_PENDING_CAMPS);
            var list = [];
            try {
                list = raw ? JSON.parse(raw) : [];
            } catch (e) {}
            list.unshift(camp);
            this.setItem(KEY_PENDING_CAMPS, JSON.stringify(list));
        },

        addPendingDonor: function (donor) {
            var raw = this.getItem(KEY_PENDING_DONORS);
            var list = [];
            try {
                list = raw ? JSON.parse(raw) : [];
            } catch (e) {}
            list.unshift(donor);
            this.setItem(KEY_PENDING_DONORS, JSON.stringify(list));
        },

        addReport: function (report) {
            var raw = this.getItem(KEY_REPORTS);
            var list = [];
            try {
                list = raw ? JSON.parse(raw) : [];
            } catch (e) {}
            list.unshift(report);
            this.setItem(KEY_REPORTS, JSON.stringify(list));
        }
    };

    // -----------------------------------------------------------------------
    // 2. Date & String Utilities
    // -----------------------------------------------------------------------
    var DateUtils = {
        getTodayISO: function () {
            return new Date().toISOString().split('T')[0];
        },

        isBeforeToday: function (isoDateStr) {
            if (!isoDateStr) return false;
            return isoDateStr < this.getTodayISO();
        },

        formatHumanDate: function (isoDateStr) {
            if (!isoDateStr) return '';
            try {
                var parts = isoDateStr.split('-');
                if (parts.length === 3) {
                    var dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                    var today = this.getTodayISO();
                    if (isoDateStr === today) {
                        return 'Today, ' + dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    }
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    if (isoDateStr === tomorrow.toISOString().split('T')[0]) {
                        return 'Tomorrow, ' + dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    }
                    return dateObj.toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                }
            } catch (e) {}
            return isoDateStr;
        }
    };

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // -----------------------------------------------------------------------
    // 3. Accessible Toast Notification System
    // -----------------------------------------------------------------------
    function showToast(message, type) {
        var toastType = type || 'info'; // 'info' | 'verified' | 'emergency'
        var container = document.getElementById('careflow-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'careflow-toast-container';
            container.setAttribute('aria-live', 'polite');
            container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;max-width:380px;width:calc(100% - 48px);';
            document.body.appendChild(container);
        }

        var toast = document.createElement('div');
        toast.className = 'alert alert-' + (toastType === 'success' ? 'verified' : toastType);
        toast.style.cssText = 'box-shadow: var(--shadow-card); margin: 0; border-radius: var(--radius-md); font-weight: 500;';
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity var(--transition-base)';
            setTimeout(function () {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 250);
        }, 3600);
    }

    // -----------------------------------------------------------------------
    // 4. Mobile Navigation Toggle Initialization
    // -----------------------------------------------------------------------
    function initNav() {
        var toggleBtn = document.querySelector('.nav-toggle');
        var navMenu = document.querySelector('.nav-menu');

        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('is-open');
        });

        document.addEventListener('click', function (e) {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('is-open')) {
                    navMenu.classList.remove('is-open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNav);
        } else {
            initNav();
        }
    }

    window.CareFlow = {
        storage: CareFlowStorage,
        dateUtils: DateUtils,
        escapeHTML: escapeHTML,
        showToast: showToast
    };

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));

