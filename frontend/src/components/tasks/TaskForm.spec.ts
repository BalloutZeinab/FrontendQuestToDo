import { mount } from '@vue/test-utils';
import TaskForm from '@/components/tasks/TaskForm.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TaskForm.vue', () => {
    it('sollte eine Aufgabe hinzufügen, wenn das Formular abgesendet wird', async () => {
        // Mock Axios-Instanz erstellen
        const axiosMock = new MockAdapter(axios);

        // Daten für den erfolgreichen Post-Request simulieren
        axiosMock.onPost('/api/tasks').reply(200, 'Erfolgreich hinzugefügt');

        // TaskForm-Komponente mounten
        const wrapper = mount(TaskForm);


        // Eingabefelder ausfüllen
        await wrapper.find('input[placeholder="Titel"]').setValue('Testaufgabe');
        await wrapper.find('input[placeholder="Beschreibung"]').setValue('Dies ist eine Testaufgabe');
        await wrapper.find('input[placeholder="Startdatum"]').setValue('2022-01-01');
        await wrapper.find('input[placeholder="Enddatum"]').setValue('2022-01-10');

        // Formular absenden
        await wrapper.find('form').trigger('submit.prevent');

        // Warten auf die asynchrone Operation
        await wrapper.vm.$nextTick();

        // Überprüfen, ob Axios.post aufgerufen wurde
        expect(axiosMock.history.post.length).toBe(1);

        // Überprüfen, ob die Aufgabe zurückgesetzt wurde, indem wir das DOM überprüfen
        expect(wrapper.find('input[placeholder="Titel"]').element.value).toBe('');
        expect(wrapper.find('input[placeholder="Beschreibung"]').element.value).toBe('');
        expect(wrapper.find('input[placeholder="Startdatum"]').element.value).toBe('');
        expect(wrapper.find('input[placeholder="Enddatum"]').element.value).toBe('');

        // Axios-Mock-Instanz wiederherstellen
        axiosMock.restore();
    });
});