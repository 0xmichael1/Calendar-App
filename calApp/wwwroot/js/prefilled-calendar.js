let calendar;

export function initializeCalendar(elementId, events = []) {
    const calendarEl = document.getElementById(elementId);
    if (!calendarEl) return;

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: events,
        editable: true,
        selectable: true,
        select: function(info) {
            addEvent(info.start);
        }
    });
    calendar.render();
}

export function addEvent(date = null) {
    if (!calendar) return;

    const title = prompt('Enter event title:');
    if (title) {
        const eventDate = date || getRandomDateInCurrentMonth();
        calendar.addEvent({
            title: title,
            start: eventDate,
            allDay: true
        });
    }
}

function getRandomDateInCurrentMonth() {
    const currentDate = calendar.getDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    return new Date(year, month, randomDay);
}