<template>
  <b-container fluid class="mt-3">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="maxPerPage"
      aria-controls="timelapsesTable"
    ></b-pagination>
    <b-table id="timelapsesTable" striped hover
        :per-page="maxPerPage"
        :current-page="currentPage"
        :items="timelapses"
        :fields="fields"
        :responsive="true">
      <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
        <div v-if="field.key == 'name'" v-bind:key="field.key">
          {{ data.item.name}}
        </div>
        <div v-else-if="field.key == 'duration'" v-bind:key="field.key">
          {{ data.item.duration }}
        </div>
        <div v-else-if="field.key == 'creation'" v-bind:key="field.key">
          {{ data.item.creation }}
        </div>
        <div v-else-if="field.key == 'actions'" v-bind:key="field.key">
          <b-button-group>
            <b-button variant="primary" @click="downloadTimelapse(data.item.name)">
              <font-awesome-icon icon="cloud-download-alt" class="is-small"/>
            </b-button>
            <b-button variant="danger" @click="confirmDelete(data.item.name)">
              <font-awesome-icon icon="trash-alt" class="is-small"/>
            </b-button>
          </b-button-group>
        </div>
      </template>
    </b-table>
    <b-modal id="deleteConfirm" title="Deleting time-lapse?">
      <template slot="default">
        <p>Do you really want to delete timelapse {{ timelapseToDelete }}?</p>
      </template>
      <template slot="modal-footer">
        <b-button variant="outline-dark" @click="closeDeleteConfirm">Cancel</b-button>
        <b-button variant="danger" @click="deleteTimelapse(timelapseToDelete)">Delete</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import axios from 'axios';
import data from '../../data/data';

export default {
  name: 'TimelapseList',
  components: {
    // TimelapsesCore,
  },
  props: {
    recorderWebSocket: Object,
    timelapses: Array,
  },
  computed: {
    rows() {
      return this.timelapses.length;
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'duration',
          label: 'Duration',
          sortable: true,
        },
        {
          key: 'creation',
          label: 'Creation',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        },
      ],
      timelapseToDelete: '',
      currentPage: 1,
      maxPerPage: 8,
    };
  },
  methods: {
    downloadTimelapse: function downloadTimelapse(timelapseName) {
      // eslint-disable-next-line
      console.log(`On Download ${timelapseName}`);
      axios({
        url: `${data.recorderApi.url}${data.recorderApi.paths.downloads}/${timelapseName}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${timelapseName}.mp4`);
        document.body.appendChild(link);
        link.click();
      });
    },
    confirmDelete: function confirmDelete(timelapseName) {
      // eslint-disable-next-line
      console.log(`On Confirm Delete ${timelapseName}`);
      this.timelapseToDelete = timelapseName;
      this.$bvModal.show('deleteConfirm');
    },
    deleteTimelapse: function deleteTimelapse(timelapseName) {
      // eslint-disable-next-line
      console.log(`On Delete ${timelapseName}`);
      this.closeDeleteConfirm();
      this.recorderWebSocket.emit('deleteTimelapse', { name: timelapseName }, (response) => {
        // eslint-disable-next-line
        console.log(response);
        if (response.result === 'success') {
          this.fireSuccessToast(response.message);
          this.$emit('updateTimelapseList');
        } else {
          this.fireFailureToast(response.message);
        }
      });
    },
    closeDeleteConfirm: function closeDeleteConfirm() {
      this.$bvModal.hide('deleteConfirm');
    },
    fireSuccessToast: function fireSuccessToast(message) {
      this.$bvToast.toast(message, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
      });
    },
    fireFailureToast: function fireFailureToast(message) {
      this.$bvToast.toast(message, {
        title: 'Failure',
        variant: 'danger',
        autoHideDelay: 10000,
      });
    },
  },
};
</script>
